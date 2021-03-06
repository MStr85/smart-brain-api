// const handleSignin = (req, res, db, bcrypt) => {
const handleSignin = (db, bcrypt) => (req, res) => {
	/*
	bcrypt.compare("apples", '$2a$10$kRncJeoN/1/9lmuU414WXuVU/TiNDpNmv6xXCGahQWPB6ugmJ52b6', function(err, hash) {
		console.log('first guess', res)
	});

	bcrypt.compare("veggies", '$2a$10$kRncJeoN/1/9lmuU414WXuVU/TiNDpNmv6xXCGahQWPB6ugmJ52b6', function(err, hash) {
		console.log('second guess', res)
	});
	*/
	/*if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	} */
	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json('icorrect form submission');
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
				return db.select('*').from('users')
				.where('email', "=", email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))			
			} else {
				rest.status(400).json('wrong credential')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}