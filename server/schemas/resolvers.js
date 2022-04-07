const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Plant } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email }).populate("favorites").populate("plants");
    },
    users: async (parent, args, context) => {
      return await User.find({}).populate("plants");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('plants').populate("favorites");
    },
    plants: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Plant.find(params);
    },
    plantsByZipcode: async (parent, args) => {
      return Plant.find({ zipCode: args.zipCode });
    },
    plant: async (parent, { plantId }) => {
      return Plant.findOne({ _id: plantId });
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
    addFavorite: async (parent, { plantId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: plantId } }
        ).populate("favorites");
      }
      throw new AuthenticationError(
        "You need to be logged in to add a favorite"
      );
    },
    removeFavorite: async (parent, { plantId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: plantId } }
        ).populate("favorites");
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a favorite"
      );
    },
    addPlant: async (parent, { username, plantDescription, plantName, plantImage, zipCode }, context) => {
      if (context.user) {
        const plant = await Plant.create({
          plantDescription,
          plantName,
          plantAuthor: context.user.username,
          plantImage,
          zipCode
        });

        const updatedUser = await User.findOneAndUpdate(
          { username: username },
          { $addToSet: { plants: plant._id } },
          { new: true }
        ).populate("plants");

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { plantId, commentText }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
          plantAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { plants: plant._id } }
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { plantId, commentId }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
