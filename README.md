# Prepare repository to work in Intellij Idea
1) to install [*ScreepsAutocomplete*](https://github.com/Garethp/ScreepsAutocomplete)
   use [*this*](https://github.com/Garethp/ScreepsAutocomplete#how-to-install) tutorial
    1) to not see `Method expression is not of Function type` on game object methods it must be both
       be presented in project and added as library as in the installation guide
       (library must not in the project folder, place it in another place)
    3) structure to place ScreepsAutocomplete folder
    ```
    project_root/
    ├── default/
    │   └── codeToTestInGame.js
    ├── python_scripts/
    │   ├── __init__.py
    │   ├── export_js_constants.py
    │   └── js_modules_flattener.py
    ├── ScreepsAutocomplete/                # <= ScreepsAutocomplete folder
    │   └── ScreepsAutocompleteFiles.js
    ├── shard3/
    │   └── codeToUseOnShard3.js
    ```
2) to have access to game constants (such as `RESOURCE_ENERGY`)
   run [*export_js_constants.py*](python_scripts/export_js_constants.py)
3) to prepare codebase to use in game
   run [*js_modules_flattener.py*](python_scripts/js_modules_flattener.py)

# Other
[*What*](https://screeps.com/forum/topic/806/what-happens-when-i-link-my-account-to-github/5)
happens when links account to GitHub.
