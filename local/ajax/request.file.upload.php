<?php


if(isset($_FILES['upl10'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl0']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl1'])){

    echo '{"status":"error", "message": "Ошибка загрузки файла"}';
    exit;
}

if(isset($_FILES['upl2'])){

    echo '{"status":"error", "message": "Неверный формат файла"}';
    exit;
}


if(isset($_FILES['upl3'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl3']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl4'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl4']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl5'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl5']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl6'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl6']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl7'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl7']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl8'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl8']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

if(isset($_FILES['upl9'])){

    echo '{"status":"success", "path":"' . 'uploads/'.$_FILES['upl9']['name'] . '", "name": "fu_ID_9[]", "value": "11"}';
    exit;
}

echo '{"status":"error", "message": "Ошибка загрузки файла"}';
exit;