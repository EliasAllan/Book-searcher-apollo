const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const bookSchema = require('../models/Book');
const { signToken } = require('../utils/auth');

const resolvers = {
  
  Query: {
  //   me: async () => {
  //     return User.find({});
  //   },
  me: async (parent, args, context) => {
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate('savedBooks');
    }
    throw new AuthenticationError('You need to be logged in!');
  },
  },
  Mutation: {

    loginUser: async (parent, { email, password }) => {
      try{
        console.log("Loging in to user!")

        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }
        
        const correctPw = await user.isCorrectPassword(password);
        console.log(correctPw)
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
        
        const token = signToken(user);
        return { token, user };
      } catch(error){
        console.log(error)
      }
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token =signToken(user)

      return { token, user }
    },
    saveBook: async (
      parent,
      { author, description, title, bookId, image, link },
      context
  ) => {
    try{
      console.log("Saving a Book!")
      if (context.user) {
        
        const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              {
                  $addToSet: {
                    savedBooks: {
                          author,
                          description,
                          title,
                          bookId,
                          image,
                          link,
                      },
                  },
              },
              {
                  new: true,
                  runValidators: true, // remove if crashes
                }
                );
                
                return user;
              }
              console.log(context);
              throw new AuthenticationError('You need to be logged in!');
            } catch (error) {
              console.log(error)
            }
  },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {

        const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
                $pull: {
                    savedBooks: {
                        bookId,
                    },
                },
            },
            {
                new: true,
                runValidators: true, // remove if crashes
            }
        );

        return user;
    }
    console.log(context);
    throw new AuthenticationError('You need to be logged in!');
},
  },
};
module.exports = resolvers;
