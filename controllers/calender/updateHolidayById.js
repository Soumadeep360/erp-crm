const schemas = require("../../mongodb/schemas/schemas");

const updateHolidayById = async (req, res) => {
    try {
        const { calender_id } = req.params;
        const holidayData = req.body;
        // Manual validation
        if (!holidayData || typeof holidayData !== 'object') {
            return res.status(400).json({ message: 'Invalid holiday data' });
        }

        if (!holidayData.title || typeof holidayData.title !== 'string' || !holidayData.title.trim()) {
            return res.status(400).json({ message: 'Title is required and must be a non-empty string' });
        }
        if (!holidayData.date || typeof holidayData.date !== 'string' || !holidayData.date.trim()) {
            return res.status(400).json({ message: 'Date is required and must be a non-empty string' });
        }
        if (!holidayData.type || !['company', 'festive', 'other'].includes(holidayData.type)) {
            return res.status(400).json({ message: 'Type is required and must be one of: company, festive, other' });
        }

        const updatedHoliday = await schemas.Calendar.findOneAndUpdate({calender_id: calender_id}, holidayData, { new: true });
        if (!updatedHoliday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }

        res.status(200).json({ updatedHoliday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateHolidayById;
