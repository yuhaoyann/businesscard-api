
INSERT INTO users (first_name,last_name)
VALUES
  ('Helen','Smith'),
  ('Welid','Semir'),
  ('Laila','Negash');
  
INSERT INTO cards (email,phone,github,linkedln,instagram)
VALUES
 ('helen@gmail.com','226-555-6789','helen-sm','helusm1','helen-sm'),
 ('welid@gmail.com','647-544-6892','welid-semir','wildoms','welid-semir'),
 ('laila@gmail.com','226-634-8967','laila-negash','liluneg','laila-negash');

 INSERT INTO user_cards (user_id,card_id)
 VALUES
(1,1),
(1,2);
