from google.adk.agents import Agent, BaseAgent
from google.adk.tools import google_search, agent_tool
from google.adk.code_executors import BuiltInCodeExecutor
from google.adk.tools.bigquery import bigquery_toolset


class ToolAgent(BaseAgent):
    def as_tool(self):
        return agent_tool.AgentTool(agent=self)


class GoogleSearchAgent(Agent, ToolAgent):
    def __init__(self, name, model):
        super().__init__(
            name=name, model=model,
            description="Agent to answer questions using Google Search.",
            instruction="I can answer your questions by searching the internet. Just ask me anything!",
            tools=[google_search]
        )


class CodeExecutionAgent(Agent, ToolAgent):
    def __init__(self, name, model):
        super().__init__(
            name=name, model=model,
            description="Executes Python code to perform calculations.",
            instruction="""You are a calculator agent.
            When given a mathematical expression, write and execute Python code to calculate the result.
            Return only the final numerical result as plain text, without markdown or code blocks.
            """,
            code_executor=BuiltInCodeExecutor(),
        )


class BQAgent(Agent, ToolAgent):
    def __init__(self, name, model):
        super().__init__(
            name=name, model=model,
            description="Agent to answer questions about BigQuery data and models and execute SQL queries.",
            instruction="""You are a data science agent with access to several BigQuery tools.
            Make use of those tools to answer the user's questions.
            """,
            tools=[bigquery_toolset],
        )
