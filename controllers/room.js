const Room = require('../models/Room');
const Cinema = require('../models/Cinema');

function create2DArray(rows, columns) {
  const array = new Array(rows);
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      array[i][j] = false;
    }
  }

  return array;
}
module.exports = {
  async getAll(req, res) {
    try {
      const response = await Room.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Room' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const { name, capacity, cinemaId, seats } = req.body;

    try {
      if (!name) {
        return res
          .status(400)
          .json({ message: 'Name parameter was not provided!' });
      }
      const roomPlan = create2DArray(seats[0], seats[1]);
      const response = await Room.create({
        name,
        capacity,
        cinemaId,
        seats: roomPlan,
      });
      await Cinema.updateOne(
        { _id: cinemaId },
        { $push: { rooms: response._id } }
      );

      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getOne(req, res) {
    try {
      const response = await Room.findById(req.params.id);
      if (!response) {
        return res.status(404).json({ message: 'Room not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getByListId(req, res) {
    const { roomsId } = req.body;
    try {
      const response = await Room.find({ _id: { $in: roomsId } })
        .populate('cinemaId')
        .exec();

      if (!response) {
        return res.status(404).json({ message: 'Room not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async updateOne(req, res) {
    const { id } = req.params;
    const { body } = req;
    const opt = { new: true };
    let updated = false;
    try {
      const response = await Room.findByIdAndUpdate(id, body, opt);
      if (!response) {
        return res.status(404).json({
          status: updated,
          message: 'Room not found',
        });
      }
      updated = true;
      return res.status(200).json({
        status: updated,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async deleteOne(req, res) {
    const { id } = req.params;
    let deleted = false;
    try {
      const response = await Room.findByIdAndRemove(id);
      if (!response) {
        return res.status(404).json({
          status: deleted,
          message: 'Room not found',
        });
      }
      deleted = true;
      return res.status(200).json({
        status: deleted,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
