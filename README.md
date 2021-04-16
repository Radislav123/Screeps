# Prepare repository to work in Intellij Idea
1) to install [*ScreepsAutocomplete*](https://github.com/Garethp/ScreepsAutocomplete)
   use [*this*](https://github.com/Garethp/ScreepsAutocomplete#how-to-install) tutorial
    1) to not see `Method expression is not of Function type` on game object methods it must be both
       be presented in project (and must not be marked as `Excluded`)
       and added as library as in the installation guide
       (library must not be in the project folder, place it in another place)
    2) structure to place ScreepsAutocomplete folder
    ```
    project_root/
    ├── default/
    │   └── codeToTestInGame.js
    ├── python_scripts/
    │   ├── __init__.py
    │   ├── export_screeps_autocomplete_constantspy
    │   └── js_modules_flattener.py
    ├── ScreepsAutocomplete/                # <= ScreepsAutocomplete folder
    │   └── ScreepsAutocompleteFiles.js
    ├── shard3/
    │   └── codeToUseOnShard3.js
    ```
2) to have access to game constants (such as `RESOURCE_ENERGY`)
    run [*export_screeps_autocomplete_constants.py*](python_scripts/export_screeps_autocomplete_constants.py)
3) to prepare codebase to use in game 
   run [*js_modules_flattener.py*](python_scripts/js_modules_flattener.py)
    1) files rename like `main/init.js` => `main.init.js` (folder name becomes part of a name),
       excluding `index.js` files, they rename  like `main/index.js` => `main.js` (folder name become whole name)
4) python scripts settings are stored in [*config.ini*](python_scripts/config.ini)
   ([*supported structure*](https://docs.python.org/3/library/configparser.html#supported-ini-file-structure))

# Other
[*What*](https://screeps.com/forum/topic/806/what-happens-when-i-link-my-account-to-github/5)
happens when links game account to GitHub.
