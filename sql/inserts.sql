INSERT INTO public.users (id, full_name, password, state, username) VALUES (1, 'Super administrator', '$2a$10$otfRTIMS1jUkZ9mDgOaJQugJ3ssR.LA/t.gR8f8nWVmkI/NWVPAvy', 'ACTIVE', 'role_admin');
ALTER SEQUENCE users_id_seq RESTART WITH 2;

INSERT INTO public.roles (id, name) VALUES (1, 'ROLE_CLIENT');
INSERT INTO public.roles (id, name) VALUES (2, 'ROLE_CLIENT_ADD');
INSERT INTO public.roles (id, name) VALUES (3, 'ROLE_CLIENT_UPDATE');
INSERT INTO public.roles (id, name) VALUES (4, 'ROLE_CLIENT_DELETE');
INSERT INTO public.roles (id, name) VALUES (5, 'ROLE_USER');
INSERT INTO public.roles (id, name) VALUES (6, 'ROLE_USER_ADD');
INSERT INTO public.roles (id, name) VALUES (7, 'ROLE_USER_UPDATE');
INSERT INTO public.roles (id, name) VALUES (8, 'ROLE_USER_STATUS');
INSERT INTO public.roles (id, name) VALUES (9, 'ROLE_CANAL');
INSERT INTO public.roles (id, name) VALUES (10, 'ROLE_CANAL_ADD');
INSERT INTO public.roles (id, name) VALUES (11, 'ROLE_CANAL_UPDATE');
INSERT INTO public.roles (id, name) VALUES (12, 'ROLE_CANAL_DELETE');
INSERT INTO public.roles (id, name) VALUES (13, 'ROLE_TYPE_RDV');
INSERT INTO public.roles (id, name) VALUES (14, 'ROLE_TYPE_RDV_ADD');
INSERT INTO public.roles (id, name) VALUES (15, 'ROLE_TYPE_RDV_UPDATE');
INSERT INTO public.roles (id, name) VALUES (16, 'ROLE_TYPE_RDV_DELETE');
INSERT INTO public.roles (id, name) VALUES (17, 'ROLE_SECTEUR');
INSERT INTO public.roles (id, name) VALUES (18, 'ROLE_SECTEUR_ADD');
INSERT INTO public.roles (id, name) VALUES (19, 'ROLE_SECTEUR_UPDATE');
INSERT INTO public.roles (id, name) VALUES (20, 'ROLE_SECTEUR_DELETE');
INSERT INTO public.roles (id, name) VALUES (21, 'ROLE_RDV');
INSERT INTO public.roles (id, name) VALUES (22, 'ROLE_RDV_ADD');
INSERT INTO public.roles (id, name) VALUES (23, 'ROLE_RDV_UPDATE');
INSERT INTO public.roles (id, name) VALUES (24, 'ROLE_RDV_DELETE');
INSERT INTO public.roles (id, name) VALUES (25, 'ROLE_STATISTIQUE');


INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 1);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 2);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 3);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 4);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 5);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 6);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 7);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 8);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 9);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 10);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 11);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 12);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 13);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 14);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 15);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 16);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 17);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 18);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 19);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 20);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 21);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 22);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 23);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 24);
INSERT INTO public.users_roles (user_id, roles_id) VALUES (1, 25);
ALTER TABLE gestion_rdv
    ALTER COLUMN date_rdv TYPE timestamp with time zone;
