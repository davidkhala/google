[wiki](https://github.com/davidkhala/google/wiki/MCP#mcp-toolbox-for-databases)
# MCP Toolbox for Databases
Ugly Design: you have to prepare a `--tools-file` toml
- It is declarative: Toolbox enables dynamic reloading by default, unless use the `--disable-reload`
- It is a connection profile that contain all credential(db user & password) specs in one.  
- Solution: configure writer overhead before server start 
## Install
```
podman pull us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox
```


## usage

> Once your server is up and running, you can load the tools into your application