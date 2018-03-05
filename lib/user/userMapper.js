/**
 * This file will have request and response object mappings.
 *
 * Created by vishal on 5/03/18.
 */

var _ = require("lodash");
const contstants = require("../constants");
const config = require('../config');


function registerMapping(params) {
    var respObj = {
        "responseMessage": "Successfully registered.",
            "responseCode" : 200,
            "userProfile":{
                id:params
                }
            };

    return respObj;
}

function userExist(){
     var respObj = {
        "responseMessage": "Email already exist.",
            "responseCode" : 400           
            } ;
                return respObj;
}

function userNotExist(){
     var respObj = {
        "responseMessage": "Email doesn't exist.",
            "responseCode" : 400           
            } ;
                return respObj;
}

function passwordMismatch(){
     var respObj = {
        "responseMessage": "Please check your password and try again.",
            "responseCode" : 400           
            } ;
          return respObj;
}
function loginMapping(params) {
    var respObj = {
        "message": "Successfully verified.",
        "accessToken": params.jwt,
        "userProfile": {
            "_id": params.user._id,
            "name": params.user.name,
            "email": params.user.email,
        }
    };
    return respObj;
}

// function verifyOtpRespMappingForAdmin(admin, jwt) {
//     var respObj = {
//         "message": "Successfully verified.",
//         "accessToken": jwt,
//         "adminProfile": {
//             "_id": admin._id,

//             "fullName": admin.adminFullName,

//             "email": admin.adminEmail,

//             "isVerifiedUser": admin.isVerified,

//         }
//     }
//     return respObj;
// }

// function uploadProfilePicResp(user) {
//     var respObj = {
//         "message": "Profile Pic Successfully Uploaded.",
//         "userProfile": {
//             "_id": user._id,
//             "userName": user.username,
//             "fullName": user.fullname,
//             "profilePic": user.profile.profilePic,
//             "email": user.profile.email,
//             "isVerifiedUser": user.isVerified,
//             "mobile": user.profile.mobile,
//             "countryCode": user.profile.countryCode,
//             "gender": user.profile.gender,
//             "isPrivate": user.isPrivate,
//             "locations": user.locations,
//             "userBio": user.userBio,
//             "userFavVerse": user.userFavVerse,
//             "followingCount": user.following.length,
//             "followerCount": user.followers.length,
//         }
//     };
//     return respObj;
// }

// function userInfoResp(params) {
//     var respObj = {
//         "message": "User Info fetched successfully",
//         "userProfile": {
//             "_id": params.user[0]._id,
//             "name": params.user[0].name,
//             "email": params.user[0].email,
//              },
//          "connections": params.connection,
//           "trips": params.trip,
      
         
//     };

//     return respObj;
// }

// function userFollowReqResp(user) {
//     var users = [];
//     if (_.isArray(user)) {
//         user.forEach(function (user) {
//             users.push(user.from);
//         })
//     }
//     var respObj = {
//         "message": "Pending follow request fetched successfully",
//         "user": users
//     };
//     return respObj;
// }


// function getBannerRespMapping(bannerList) {
//     var respObj = {
//         "message": "Banner Fetched Successfully.",
//     };

//     var bannerArr = [];
//     if (bannerList.length > 0) {
//         bannerList.forEach(function (banner) {
//             bannerArr.push({ bannerId: banner._id, bannerImageUrl: banner.bannerImageUrl, deeplink: banner.deepLink });
//         })
//     }
//     respObj.bannerList = bannerArr;
//     return bannerList;
// }

// function getPageAlertsRespMapper(result) {
//     var respObj = {
//         message: "Alert fetched successfully",
//         alert: {
//             _id: result._id,
//             pageId: result.pageId,
//             userId: result.userId,
//             alertsForThis: result.alertsForThis,
//             isLikes: result.isLikes,
//             isReposts: result.isReposts,
//             isComments: result.isComments,
//             isNewFollowers: result.isNewFollowers,
//             isTags: result.isTags,
//             bundleAlerts: result.bundleAlerts,
//             alertFollowing: result.alertFollowing
//         }
//     };
//     return respObj;
// }

module.exports = {
    registerMapping,
    userExist,
    loginMapping,
    passwordMismatch,
    userNotExist
    // uploadProfilePicResp,
    // getBannerRespMapping,
    // userInfoResp,
    // userFollowReqResp,
    // getPageAlertsRespMapper,
    // verifyOtpRespMappingForAdmin
};