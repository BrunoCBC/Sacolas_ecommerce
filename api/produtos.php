<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $host = "db";
    $user = "root";
    $pass = "root";
    $db   = "ecommerce";

    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Conexão falhou: " . $conn->connect_error]));
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $input = json_decode(file_get_contents('php://input'), true);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id > 0) {
            $sql = "SELECT * FROM produtos WHERE id = $id LIMIT 1";
            $result = $conn->query($sql);
            $produto = $result->fetch_assoc();
            echo json_encode($produto);
        } else {
            $sql = "SELECT * FROM produtos";
            $result = $conn->query($sql);
            $produtos = [];
            while ($row = $result->fetch_assoc()) {
                $produtos[] = $row;
            }
            echo json_encode($produtos);
        }
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $titulo = $conn->real_escape_string($input['titulo']);
        $descricao = $conn->real_escape_string($input['descricao']);
        $valor = floatval($input['valor']);
        $categoria = $conn->real_escape_string($input['categoria']);
        $imagem_url = $conn->real_escape_string($input['imagem_url']);

        $sql = "INSERT INTO produtos (titulo, descricao, valor, categoria, imagem_url) 
                VALUES ('$titulo', '$descricao', $valor, '$categoria', '$imagem_url')";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "id" => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            exit();
        }

        $titulo = $conn->real_escape_string($input['titulo']);
        $descricao = $conn->real_escape_string($input['descricao']);
        $valor = floatval($input['valor']);
        $categoria = $conn->real_escape_string($input['categoria']);
        $imagem_url = $conn->real_escape_string($input['imagem_url']);

        $sql = "UPDATE produtos SET 
                    titulo='$titulo', 
                    descricao='$descricao', 
                    valor=$valor, 
                    categoria='$categoria', 
                    imagem_url='$imagem_url'
                WHERE id=$id";

        if ($conn->query($sql)) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
    }

    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            exit();
        }

        $sql = "DELETE FROM produtos WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
    }

    $conn->close();
?>
