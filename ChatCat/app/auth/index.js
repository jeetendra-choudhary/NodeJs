'use strict';

const passport = require('passport')
  , config = require('../config')
  , FacebookStrategy = require('passport-facebook').Strategy
  , h = require('../helpers')

module.exports = () => {

  passport.serializeUser((user,done) => {
    done(null,user.id)
  })

  passport.deserializeUser((id,done) => {
    // find and fetch user from our mongodb collection based on the id
    h.findById(id)
      .then(user => done(null,user))
      .catch(error => console.log('Error when deserializing user'))
  })

 let authProcessor = (accessToken,refreshToken,profile,done) => {
 10     //Find a user in local db using profile.id
 11     //If the user is found, return the user data using the done()
 12     //If the user is not found, create one in the local db and return same 
        h.findOne(profile.id)
        .then(result => {
          if(result){
            done(null,result)
          }else{
            // create a new user and then return a done method
            h.createNewUser(profile)
              .then(newChatUser => done(null,newChatUser))
              .catch(error => console.log('Error when creating new User'))
          }
        })
 13   }
 passport.use(new FacebookStrategy(config.fb,authProcessor))
}
