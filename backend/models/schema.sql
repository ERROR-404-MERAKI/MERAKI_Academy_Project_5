-- -- welcome to mtsql
-- DROP DATABASE meraki_academy_project_5;

CREATE DATABASE meraki_academy_project_5;

USE meraki_academy_project_5;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    ProfilePicture VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    roleId INT,
    FOREIGN KEY (roleId) REFERENCES roles(id),
    PRIMARY KEY(id)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT NOT NULL,
    description VARCHAR (255) NOT NULL,
    media VARCHAR(255) NOT NULL,
    date DATETIME DEFAULT 0,
    likes INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT NOT NULL,
    post_id INT,
    user_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    PRIMARY KEY (id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT NOT NULL,
    message VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE storys (
    id INT AUTO_INCREMENT NOT NULL,
    story VARCHAR (255) NOT NULL,
    date DATETIME NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    date DATETIME,
    user_id INT NOT NULL,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id),
    PRIMARY KEY (id)
);

CREATE TABLE follow (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    person_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (person_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);