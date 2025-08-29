from typing import Optional

from google.adk.tools.openapi_tool.auth.auth_helpers import token_to_scheme_credential
from google.adk.tools.apihub_tool.apihub_toolset import APIHubToolset

class APIHubTool:

    def __init__(self, resource_name: str, access_token: str, apikey_credential: Optional[str] = None):
        """
        :param resource_name:
        :param access_token: result of `gcloud auth print-access-token`
        :param apikey_credential: Not required if your APIs don't required authentication.
        """


        options = {
            "access_token": access_token,
            "apihub_resource_name": resource_name
        }
        if apikey_credential is not None:
            options["auth_scheme"], options["auth_credential"] = token_to_scheme_credential(
                "apikey", "query", "apikey", apikey_credential
            )

        self._ = APIHubToolset(**options)

    @property
    def tools(self):
        return self._.get_tools()



