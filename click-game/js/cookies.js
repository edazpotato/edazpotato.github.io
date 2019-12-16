var cookiesObj = {
    setCookie: function(name,value,days) {
        var expires = "; SameSite=None; Secure; expires=Thu, 2 Aug 2070 20:47:11; path=/";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; SameSite=None; Secure; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) {
                console.log(c.substring(nameEQ.length,c.length));
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
    eraseCookie: function(name) {   
        document.cookie = name+'=; Max-Age=-99999999;';  
    }
}

var cookies = Object.create(cookiesObj);