import os.path
from shutil import which

from google.adk.tools.mcp_tool import McpToolset, StdioConnectionParams
from mcp import StdioServerParameters


# TODO deprecated sample in https://google.github.io/adk-docs/tools/mcp-tools/#example-1-file-system-mcp-server
# https://github.com/search?q=repo%3Agoogle%2Fadk-docs%20MCPToolset&type=code
class NPXBasedTool:
    def __init__(self):
        assert which("npx")


class FSTool(NPXBasedTool, McpToolset):
    def __init__(self, root_path: str):
        super().__init__(connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command='npx', args=["-y", "@modelcontextprotocol/server-filesystem", os.path.abspath(root_path)]
            )
        ))


class GoogleMapTool(NPXBasedTool, McpToolset):
    def __init__(self, google_maps_api_key: str):
        super().__init__(connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command='npx', args=["-y", "@modelcontextprotocol/server-google-maps"],
                env={"GOOGLE_MAPS_API_KEY": google_maps_api_key}
            )
        )
        )
