const { catchAsync } = require("../utils/globalErrorHandler");
const talkieService = require("../services/talkieService");

const getTalkieCard = catchAsync(async (req, res) => {
	const { user } = req;
	const { offset } = req.query;
	let { isUser } = req.headers;

	const data = await talkieService.getTalkieCard[isUser](
		isUser,
		offset,
		user.id ? user.id : null
	);

	const Message = {
		USER: "TALKIE_CARDS_FOR_USER_HAVE_BEEN_LOADED",
		GUEST: "TALKIE_CARDS_FOR_GUEST_HAVE_BEEN_LOADED",
		NO_DATA: "END_OF_DATA_REACHED",
	};

	const StatusCode = {
		USER: 200,
		GUEST: 200,
		NO_DATA: 204,
	};

	if (!data.length) isUser = "NO_DATA";

	res.status(StatusCode[isUser]).json({ message: Message[isUser], data });
});

const getBookmarkedTalkies = async (req, res) => {
	const { id: user_id } = req.user;

	const data = await talkieService.getBookmarkedTalkies(user_id);

	let message = "USER_BOOKMARK_LOADED_SUCCESSFULLY";
	let statusCode = 200;

	if (!data.data.length) {
		statusCode = 204;
		message = "NO_INFORMATION_MATCHED";
	}

	res.status(statusCode).json({ data, message });
};

const bookmarkTalkie = async (req, res) => {
	const { talkie_id } = req.params;
	const { user } = req;

	if (!talkie_id) {
		const error = new Error("TALKIE_DATA_REQUIRED");
		error.statusCode = 400;
		throw error;
	}

	const { insertId } = await talkieService.bookmarkTalkie(talkie_id, user.id);

	res.status(201).json({ message: "BOOKMARK_CREATED" });
};

const deleteBookmark = catchAsync(async (req, res) => {
	const { bookmark_id } = req.params;
	const { user } = req;

	if (!bookmark_id) {
		const error = new Error("BOOKMARK_DATA_REQUIRED");
		error.statusCode = 400;
		throw error;
	}

	await talkieService.deleteBookmark(bookmark_id, user.id);

	res.status(204).json({ message: "DELETION_COMPLETED_SUCCESSFULLY" });
});

const getTalkieCardByEncounter = catchAsync(async (req, res) => {
	const { encounter_id } = req.params;
	const { isUser } = req.headers;
	const { id: user_id } = req.user;

	const data = await talkieService.getTalkieCardByEncounter(
		isUser,
		user_id,
		encounter_id
	);

	res.status(200).json({ data });
});

const getTalkieCardByTopic = catchAsync(async (req, res) => {
	// topic_id 를 받으면 토픽에 해당하는 talkie 리스트 반환하는 API
	// topic 추천 5개도 보내야하는데... Left join을 쓰는 게 나을 까 각각 DB 연결을 따로 하는 게 좋을까?

	const { isUser } = req.headers;
	const { id: user_id } = req.user;
	const { topic_id } = req.params;

	const data = await talkieService.getTalkieCardByTopic(
		isUser,
		user_id,
		topic_id
	);

	res.status(200).json({ data });
});

module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	bookmarkTalkie,
	deleteBookmark,
	getTalkieCardByEncounter,
	getTalkieCardByTopic,
};
