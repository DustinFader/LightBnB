INSERT INTO users (id, name, email_address, password)
VALUES (1, 'markus', 'hunkydory@gmulk.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'gunter', 'dakertin@gmulk.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'polim', 'kinderton@gmulk.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1, 'openses', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 230, 2, 1, 1, 'canada', 'route', 'city', 'alberta', 'qrl po2', true),
(2, 2, 'loper', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 20, 2, 1, 1, 'canada', 'route', 'city', 'alberta', '5rl po7', true),
(3, 3, 'gonker', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 23, 2, 1, 1, 'canada', 'route', 'city', 'alberta', 'q5l p62', true);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2390-09-23', '2391-08-12', 1, 1),
(2, '2200-09-23', '2201-08-12', 2, 2),
(3, '1400-09-23', '1401-08-12', 3, 3);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 1, 1, 3, 'message'),
(2, 3, 2, 2, 2, 'message'),
(3, 3, 1, 3, 0, 'message');