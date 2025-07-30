CREATE DATABASE IF NOT EXISTS tasksdb;

USE tasksdb;


CREATE TABLE IF NOT EXISTS tasks(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (150) NOT NULL,
    description TEXT,
    date DATE,
    priority TINYINT NOT NULL DEFAULT 1, -- 1: bajo, 2: medio, 3: alto
    completed BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO tasks (title, description, priority, completed) VALUES
    ('task 1', 'alguna descripcion', 1, 0),
    ('task 2', 'alguna descripcion', 2, 0);