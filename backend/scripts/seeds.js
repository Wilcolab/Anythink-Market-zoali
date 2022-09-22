//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require("mongoose");

require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

if (!process.env.MONGODB_URI) {
  console.warn("Missing MONGODB_URI in env, please add it to your .env file");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\n\nConnection Open\n\n");
  })
  .catch((err) => {
    console.log("\n\n" + err + "\n\n");
    process.exit();
  });

const seedDB = async () => {
  //Creating 100 records
  for (let usrNum = 0; usrNum < 100; usrNum++) {
    const seedUser = {
      username: `user${usrNum}`,
      email: `user${usrNum}@fakemail.com`,
      bio: `SDE ${usrNum}`,
      image:
        "https://media.istockphoto.com/vectors/chat-bot-ai-and-customer-service-support-concept-vector-flat-person-vector-id1221348467?k=20&m=1221348467&s=612x612&w=0&h=hp8h8MuGL7Ay-mxkmIKUsk3RY4O69MuiWjznS_7cCBw=",
    };

    const user = new User(seedUser);
    const savedUsr = await user.save();

    const seedItem = {
      slug: `Product${usrNum}-${savedUsr._id}`,
      title: `Product${usrNum}`,
      description: `Buy this product`,
      image: `https://random.imagecdn.app/360/360`,
      comments: [],
      tagList: ["fakeads"],
      seller: savedUsr._id,
    };

    const item = new Item(seedItem);
    const savedItem = await item.save();

    const seedComment = {
      body: "Fake Product, Bad Service",
      seller: savedUsr._id,
      item: savedItem._id,
    };

    const comment = new Comment(seedComment);
    await comment.save();
  }
};

seedDB()
  .then(() => {
    console.log("\n\n\n\nSeeding Successful");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
