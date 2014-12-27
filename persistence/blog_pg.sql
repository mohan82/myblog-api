
drop table post;

create table post
(
  post_pk serial not null,
  title varchar(500) not null,
  guid VARCHAR(500) not null,
  content bytea not null
);

