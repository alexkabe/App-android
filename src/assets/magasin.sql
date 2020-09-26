create table client(id integer auto_increment primary key, code text, nom text, prenom text, psa int(8));
insert into client (code, nom, prenom, psa) values ('8912B8932', 'Ali', 'baba', 4);
insert into client (code, nom, prenom, psa) values ('891HGF832', 'Kalicha', 'Mortone', 6);
insert into client (code, nom, prenom, psa) values ('34912RL32', 'Partage', 'Salla', 3);
insert into client (code, nom, prenom, psa) values ('6G12B82', 'Velo', 'Maldini', 5);
create table article(id integer auto_increment primary key, code text, prix int(16), quantite int(16), noma text);
insert into article(code, prix, quantite, noma) values('C23', 2500, 45, 'Mayonnaise');
insert into article(code, prix, quantite, noma) values('XV33', 25000000, 25, 'Voiture');
insert into article(code, prix, quantite, noma) values('8MR3', 450000, 15, 'Moto');