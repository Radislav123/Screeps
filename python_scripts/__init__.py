import configparser
import sys
import os


CONFIG_FILE_NAME = "config.ini"


def get_executing_file_name():
    return os.path.basename(sys.argv[0]).split('.')[0]


def get_config():
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE_NAME)
    return config[get_executing_file_name()]
