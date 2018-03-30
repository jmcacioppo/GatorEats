angular.module('gatorEats')
    .factory('TransferUserData', TransferUserData)

function TransferUserData() {
    var savedUserData = {};
    
    function setUser(userData) {
        savedUserData = userData;
    }
    
    function getUser() {
        return savedUserData;
    }
    
    return {
        setUser: setUser,
        getUser: getUser
    };
}