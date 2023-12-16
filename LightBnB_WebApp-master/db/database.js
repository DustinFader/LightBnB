const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = LOWER($1);
  `;

  return pool.query(queryString, [email]).then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }).catch((err) => {
    console.log(err.message);
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;

  return pool.query(queryString, [id]).then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }).catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  return pool.query(queryString, [user.name, user.email, user.password]).then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }).catch((err) => {
    console.log(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.id AS id, title, cost_per_night, start_date, AVG(rating) AS average_rating, properties.*
  FROM property_reviews
  JOIN properties ON properties.id = property_id
  JOIN reservations ON reservations.id = property_reviews.reservation_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, title, cost_per_night, number_of_bathrooms, number_of_bedrooms, parking_spaces, properties.id
  ORDER BY start_date
  LIMIT $2;`;

  return pool.query(queryString, [guest_id, limit]).then(result => {
    if (result.rows.length > 0) {
      console.log(result.rows);
      return result.rows;
    }
    return null;
  }).catch(err => {
    console.log(err.message);
  });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  
  const buildWhereClause = (options, queryParams) => {
    let whereClause = '';
    
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      whereClause += ` AND city LIKE $${queryParams.length} `;
    }
  
    if (options.owner_id) {
      queryParams.push(Number(options.owner_id));
      whereClause += ` AND owner_id = $${queryParams.length} `;
    }
  
    if (options.minimum_price_per_night) {
      queryParams.push(Number(options.minimum_price_per_night) * 100);
      whereClause += ` AND cost_per_night > $${queryParams.length} `;
    }
    
    if (options.maximum_price_per_night) {
      queryParams.push(Number(options.maximum_price_per_night) * 100);
      whereClause += ` AND cost_per_night < $${queryParams.length} `;
    }
    return whereClause;
  };
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1`;

  queryString += buildWhereClause(options, queryParams);
  
  queryString += `
  GROUP BY properties.id`;

  // having clause
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `\nHAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams).then((res) => res.rows).catch(err => console.log(err.message));
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const queryString = `
  INSERT INTO properties (
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;

  return pool.query(queryString,
    [property.title,
      property.description,
      Number(property.number_of_bedrooms),
      Number(property.number_of_bathrooms),
      Number(property.parking_spaces),
      Number(property.cost_per_night),
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.street,
      property.country,
      property.city,
      property.province,
      property.post_code,
      Number(property.owner_id)]).then((res) => res.rows).catch(err => console.log(err.message));
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
