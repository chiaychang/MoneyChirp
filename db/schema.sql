CREATE DATABASE MoneyChirp_db;

CREATE TABLE company_lists (
	ID INT NOT NULL AUTO_INCREMENT,
    company_name VARCHAR(20) NOT NULL,
    twitter_handle VARCHAR(20) NOT NULL,
    stock_sym VARCHAR(20) NOT NULL,
    PRIMARY KEY (ID)
);