function FindProxyForURL(url, host) {
    // Список всех YouTube-связанных доменов
    var youtubeDomains = [
        "youtube.com",
        "www.youtube.com", 
        "m.youtube.com",
        "youtu.be",
        "gaming.youtube.com",
        "music.youtube.com", 
        "studio.youtube.com",
        "tv.youtube.com",
        "googlevideo.com",
        "youtube-nocookie.com",
        "ytimg.com",
        "ggpht.com",
        "youtubei.googleapis.com",
        "www.googleapis.com"
    ];
    
    // Проверка точного совпадения домена
    for (var i = 0; i < youtubeDomains.length; i++) {
        if (dnsDomainIs(host, youtubeDomains[i])) {
            return "SOCKS5 127.0.0.1:1080";
        }
    }
    
    // Проверка поддоменов с помощью wildcard
    if (shExpMatch(host, "*.youtube.com") ||
        shExpMatch(host, "*.googlevideo.com") ||
        shExpMatch(host, "*.ytimg.com") ||
        shExpMatch(host, "*.ggpht.com") ||
        shExpMatch(host, "*.youtu.be") ||
        shExpMatch(host, "*.youtube-nocookie.com")) {
        return "SOCKS5 127.0.0.1:1080";
    }
    
    // Google-домены, но только для YouTube-трафика
    if (shExpMatch(host, "*.googleapis.com") ||
        shExpMatch(host, "*.googleusercontent.com") ||
        shExpMatch(host, "*.gstatic.com")) {
        
        // Проверяем URL на наличие YouTube-маркеров
        if (shExpMatch(url, "*youtube*") ||
            shExpMatch(url, "*googlevideo*") ||
            shExpMatch(url, "*ytimg*") ||
            shExpMatch(url, "*ggpht*") ||
            shExpMatch(url, "*youtu.be*")) {
            return "SOCKS5 127.0.0.1:1080";
        }
    }
    
    // Все остальное - напрямую
    return "DIRECT";
}
