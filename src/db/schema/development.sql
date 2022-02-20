
INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('Helen', 'Smith','helen@gmail.com','$2b$10$iyqfu8WXZnjLVDMFgmfjpujgMLvSLXbDmBs5kTWVK1gtfcqD.P9gy'),
  ('Welid', 'Semir', 'welid@gmail.com', '$2b$10$iyqfu8WXZnjLVDMFgmfjpujgMLvSLXbDmBs5kTWVK1gtfcqD.P9gy' ),
  ('Laila','Negash','laila@gmail.com', '$2b$10$iyqfu8WXZnjLVDMFgmfjpujgMLvSLXbDmBs5kTWVK1gtfcqD.P9gy');
  
INSERT INTO cards (user_id, fullname, email, photo, title, company, phone, github, linkedin, facebook, instagram, bio)
VALUES
 (1,'Helen Smith','helen@gmail.com',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWWsl5twoOi5_XrlEZGJLqSsE9IlXctpXqg&usqp=CAU',
  'title1','company1','226-555-6789','github1','linkedin1','facebook1','instagram1',
  'bio'),
 (2,'Welid Semir','welid@gmail.com',
   'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80',
  'title2','company2','647-544-6892','github2','linkedin2','facebook2','instagram2',
  'bio'),
 (3,'Laila Negash','laila@gmail.com',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSOfVKWeUXO1igbOj5_JZ0ZehxDhk0DL2xw&usqp=CAU',
  'title3','company3','226-634-8967','github2','linkedin2','facebook2','instagram2',
  'bio');

 INSERT INTO user_cards (user_id,card_id,isSelfCard)
 VALUES
(1,1,true),
(1,2,false),
(1,3,false),
(2,1,false),
(2,2,true),
(2,3,false),
(3,1,false),
(3,2,false),
(3,3,true);
