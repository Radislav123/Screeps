from python_scripts import get_config
import glob
import os
import re


JS_FOLDER_MAIN_FILE_NAME = "index"
SCRIPT_FOLDER = os.path.dirname(__file__)
config = get_config()


if __name__ == '__main__':
    folder_to_flatten = config["folder_to_flatten"]
    for path in glob.glob(f"../{folder_to_flatten}/**/*"):
        file_path = f"{SCRIPT_FOLDER}/{path}".replace('\\', '/')
        # relative to config["folder_to_flatten"]
        relative_path = file_path.split(folder_to_flatten)[-1]
        new_file_name = relative_path[1:].replace('/', '.')

        # remove "index" from new_file_name
        if JS_FOLDER_MAIN_FILE_NAME in new_file_name:
            new_file_name = new_file_name.replace(JS_FOLDER_MAIN_FILE_NAME, "")

        with open(file_path, 'r') as read_file:
            file_text = read_file.read()
            found_requirements = [
                list(x) for x in re.findall(r"(let )(.+)( = require\(\")(.+)(\"\))(.*)(;)", file_text)
            ]
            for requirement in found_requirements:
                old_requirement = "".join(requirement)
                requirement[3] = requirement[3].replace('/', '.')
                new_requirement = "".join(requirement)

                # remove ".index" from module requirement (== import)
                if f".{JS_FOLDER_MAIN_FILE_NAME}" in new_requirement:
                    new_requirement = new_requirement.replace(f".{JS_FOLDER_MAIN_FILE_NAME}", "")

                file_text = file_text.replace(old_requirement, new_requirement)

            new_file_path = f"{file_path.split(folder_to_flatten)[0]}" \
                            f"{config['folder_to_place_flattened_code']}/{new_file_name}"

            with open(new_file_path, 'w') as write_file:
                write_file.write(file_text)
    pass
