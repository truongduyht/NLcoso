const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Không được để trống"],
    },

    email: {
      type: String,
      required: [true, "Không được để trống"],
      unique: true,
      index: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} không phải là email hợp lệ`,
      },
    },

    studentID: {
      type: String,
      required: [true, "Không được để trống"],
    },

    password: {
      type: String,
      required: [true, "Không được để trống"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    cart: {
      type: Object,
      default: {},
    },
    // khi user tạo order, thêm objectId từ model Order vào mảng orders trong User
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { minimize: false }
);

// tạo phương thức tĩnh
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Sai thông tin đăng nhập hoặc mật khẩu!");

  // nếu đúng mật khẩu, dùng crypt để so sánh mật khẩu đã hash với mật khẩu người dùng nhập khi đăng nhập, nếu mật khẩu khớp thì trả về user
  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (isSamePassword) return user;

  // nếu sai trả về lỗi
  throw new Error("Sai thông tin đăng nhập hoặc mật khẩu!");
};

// được gọi mỗi khi User được chuyển đổi thành JSON, xoá password, đảm bảo khi trả về user sẽ không hiện password (middleware)
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

//before saving => hash the password
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// nếu user bị xoá, thì các order của user đó cũng bị xoá theo (middleware)
UserSchema.pre("remove", function (next) {
  this.model("Order").remove({ owner: this._id }, next);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
