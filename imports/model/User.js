import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const UserProfile = Class.create({
    name: 'UserProfile',
    fields: {
        name: String,
        gender: Number,
        userType: {
            type: Number,
            immutable: true,
            default: 2,
        },
    }
});

export const User = Class.create({
    name: "User",
    collection: Meteor.users,
    fields: {
        username: String,
        profile: UserProfile,
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    },
    helpers: {
        isAdmin() {
            return this.profile.userType === 0;
        },
        isStaff() {
            return this.profile.userType === 1;
        },
        isUser() {
            return this.profile.userType === 2;
        },
        acidId() {
            return this.username.toUpperCase();
        }
    }
});

if (Meteor.isServer) {
    User.extend({
        meteorMethods: {
            create(userObj, profileObj = {}) {
                userObj.profile = profileObj;
                Accounts.createUser(userObj);
            },
            // update(profileObj) {
            //     this.profile.name = profileObj.name;
            //     this.profile.gender = profileObj.gender;
            //     this.profile.yearOfBirth = profileObj.yearOfBirth;

            //     console.log(this.yearOfBirth);

            //     return this.save();
            // },
            // createStaff(userObj, profileObj = {}) {
            //     userObj.profile = profileObj;
            //     userObj.profile.userType = [1];
            //     Accounts.createUser(userObj);
            // },
            // isExist(username) {
            //     let user = User.findOne({username});
            //     return user !== undefined;
            // }
        }
    });

    Meteor.publishComposite('loginUser', function(refresh = 0) {
        return {
            find: function() {
                return User.find(this.userId);
            },
        };
    });

    if (!User.findOne()) {
        let user = new User();
        user.create({
            username: "admin",
            password: "n",
        }, {
            name: "Admin",
            userType: 0,
            gender: 0,
        });

        user = new User();
        user.create({
            username: "mnzaim2",
            password: "930311086157",
        }, {
            name: "Mohamad Nizul Zaim Anuar",
            userType: 2,
            gender: 0,
        });
    }
}