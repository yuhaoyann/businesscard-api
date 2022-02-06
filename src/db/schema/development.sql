
INSERT INTO users (first_name,last_name,email)
VALUES
  ('Helen','Smith','helen@gmail.com'),
  ('Welid','Semir','welid@gmail.com'),
  ('Laila','Negash','laila@gmail.com');
  
INSERT INTO cards (fullname,email,photo,title,company,phone,github,linkedln,facebook,instagram,bio)
VALUES
 ('Helen Smith','helen@gmail.com',
   'https://i.imgur.com/LpaY82x.png',
  'title1','company1','226-555-6789','github1','linkedin1','facebook1','instagram1',
  'bio'),
 ('Welid Semir','welid@gmail.com',
   'https://i.imgur.com/T2WwVfS.png',
  'title2','company2','647-544-6892','github2','linkedin2','facebook2','instagram2',
  'bio'),
 ('Laila Negash','laila@gmail.com',
  'https://i.imgur.com/3tVgsra.jpg',
  'title3','company3','226-634-8967','github2','linkedin2','facebook2','instagram2',
  'bio');

 INSERT INTO user_cards (user_id,card_id,isSelfCard)
 VALUES
(1,1,true),
(1,2,false),
(1,3,false),
(2,1,true),
(2,2,false),
(2,3,false),
(3,1,true),
(3,2,false),
(3,3,false);
