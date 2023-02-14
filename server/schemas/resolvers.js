
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    login: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addUser: async (parent, { username, email, bookCount }) => {
      return await User.create({ username, email, bookCount });
    },
    saveBook: async (parent, { book }) => {
      return await User.findOneAndUpdate({ _id: id }, {$push:{savedBooks: book}}, {new: true});
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
