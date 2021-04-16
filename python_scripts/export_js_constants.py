import glob
import os


SCRIPT_FOLDER = os.path.dirname(__file__)


def export_constants():
    relative_read_path = "../ScreepsAutocomplete/Global/Constants.js"
    relative_write_path = "../ExportedConstants.js"
    absolute_read_path = os.path.join(SCRIPT_FOLDER, relative_read_path)
    absolute_write_path = os.path.join(SCRIPT_FOLDER, relative_write_path)

    with open(absolute_read_path, 'r') as read_file:
        file_text = read_file.read()
        file_text = file_text.replace("const ", "export const ")
        with open(absolute_write_path, 'w') as write_file:
            write_file.write(file_text)


def add_noinspections():
    folders_to_search_js_files = ["default"]

    for folder in folders_to_search_js_files:
        for path in glob.glob(f"../{folder}/*.js", recursive = True):
            file_path = f"{SCRIPT_FOLDER}/{path}".replace('\\', '/')
            with open(file_path, 'r+') as file:
                file_text = file.read()
                file.seek(0, 0)
                first_line = file.readline()
                noinspection_text = "// noinspection JSUnresolvedVariable"
                if noinspection_text not in first_line:
                    file.seek(0, 0)
                    file.write(noinspection_text + '\n\n' + file_text)


if __name__ == '__main__':
    export_constants()
    add_noinspections()
