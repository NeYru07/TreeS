<?php
// Устанавливаем заголовки для корректной работы AJAX и JSON-ответа
header('Content-Type: application/json');
// Это позволит принимать запросы с вашего сайта. 
// В продакшене лучше заменить '*' на домен вашего сайта.
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');

// --- НАСТРОЙКИ БАЗЫ ДАННЫХ ---
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'user_tree'); 
define('DB_PASSWORD', 'SecurePass123!'); 
define('DB_NAME', 'user_tree'); 
// -----------------------------

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Некорректный метод запроса.']);
    exit();
}

// 1. Устанавливаем соединение с базой данных
$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($mysqli->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка подключения к базе данных: ' . $mysqli->connect_error
    ]);
    exit();
}

// 2. Получение и очистка данных из формы
$clientName = trim($_POST['clientName'] ?? '');
$clientPhone = trim($_POST['clientPhone'] ?? '');
$clientEmail = trim($_POST['clientEmail'] ?? '');
$clientCity = trim($_POST['clientCity'] ?? '');
$companyForm = trim($_POST['companyForm'] ?? '');

// Так как поля seedlingsAmount и hectares приходят как строки, а в БД INT, используем null для пустых значений
$seedlingsAmount = is_numeric($_POST['seedlingsAmount'] ?? null) ? (int)$_POST['seedlingsAmount'] : null;
$hectaresAmount = is_numeric($_POST['hectares'] ?? null) ? (int)$_POST['hectares'] : null;
$totalSum = trim($_POST['totalSum'] ?? '0');

// 3. Базовая валидация
if (empty($clientName) || empty($clientPhone)) {
    echo json_encode(['success' => false, 'message' => 'Поля Имя и Телефон обязательны для заполнения.']);
    $mysqli->close();
    exit();
}

// 4. Подготовка и выполнение SQL-запроса (используем подготовленные выражения для безопасности)
$sql = "INSERT INTO applications (client_name, client_phone, client_email, client_city, company_form, seedlings_amount, hectares_amount, total_sum) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $mysqli->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подготовки SQL-запроса: ' . $mysqli->error]);
    $mysqli->close();
    exit();
}

// Привязка параметров: s - string, i - integer.
$stmt->bind_param("sssssiss", $clientName, $clientPhone, $clientEmail, $clientCity, $companyForm, $seedlingsAmount, $hectaresAmount, $totalSum);

if ($stmt->execute()) {
    // Успешный ответ
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно сохранена в базе данных!'
    ]);
} else {
    // Ошибка выполнения
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при сохранении заявки: ' . $stmt->error
    ]);
}

// 5. Закрытие соединения
$stmt->close();
$mysqli->close();
?>