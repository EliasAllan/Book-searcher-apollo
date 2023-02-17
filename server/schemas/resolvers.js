
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  
  Query: {
  //   me: async () => {
  //     return User.find({});
  //   },
    me: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token =signToken(user)

      return { token, user }
    },
    saveBook: async (parent, { userId, book }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        {
          $push:{savedBooks: book}
        },
        {
          new: true,
          runValidators:true,
        }
        );
    },
    removeBook: async (parent, { bookId }) => {
      return await User.findOneAndDelete(
        {_id: bookId},
        {$pull: {savedBooks: book}},
        {new:true}
        )
    }
  },
};

module.exports = resolvers;
