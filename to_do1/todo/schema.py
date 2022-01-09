import graphene
from graphene_django import DjangoObjectType
from project.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))
    project_by_rep_link = graphene.Field(ProjectType, link=graphene.String(required=False))

    todo_by_username = graphene.List(ToDoType, username=graphene.String(required=False))

    def resolve_project_by_rep_link(root, info, link=None):
        if link:
            return Project.objects.get(rep_link=link)
        return None

    def resolve_user_by_id(root, info, id=None):
        if id:
            return User.objects.get(id=id)
        return None

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        projects = Project.objects.all()
        return projects

    def resolve_todo_by_username(root, info, username=None):
        if username:
            return ToDo.objects.filter(user=User.objects.get(username=username).id)
        return ToDo.objects.all()


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        rep_link = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id, name, rep_link):
        project = Project.objects.get(id=id)
        project.name = name
        project.rep_link = rep_link
        project.save()
        return ProjectUpdateMutation(project=project)


class Mutation(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
