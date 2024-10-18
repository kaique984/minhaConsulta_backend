const db = require('../db/database');

exports.getConsultations = (req, res) => {
  db.all(`SELECT * FROM consultations`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;
  db.run(`INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

const db = require('../db/database'); // Supondo que esse arquivo gerencia a conexão com o banco de dados

// Função para buscar consultas do banco de dados
exports.getConsultasPorUsuario = async (req, res) => {
    const user = req.user; // Supondo que você pega o usuário autenticado a partir do token

    try {
        let consultas;
        if (user.role === 'admin') {
            // Se for admin, retorna todas as consultas
            consultas = await db.all('SELECT * FROM consultas');
        } else {
            // Se for um usuário normal, retorna apenas as consultas do próprio usuário
            consultas = await db.all('SELECT * FROM consultas WHERE usuario_id = ?', [user.id]);
        }
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar consultas', error });
    }
};
