import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { cardCreate, dragCardUpdate, getCards } from "../Server/User/getallCard";
import { newComment } from "../Server/User/AddNewComment";
import { getComments } from "../Server/User/GetComments";
import { cardEditUpdate } from "../Server/User/CardEditUpdate";
import { inviteAssignee } from "../Server/User/InviteNewAssignee";

// -----MIDDLEWARES---

// get all cards
export const getAllCards = createAsyncThunk('user/getAllCards', async ({ access, board_slug }) => {
    const response = await getCards(access, board_slug)
    return response
})

// create a new card
export const newCardCreate = createAsyncThunk('user/newCardCreate', async ({ access, id, title, description, maxNum, emails , selectedColor, priority}) => {
    const response = await cardCreate(access, id, title, description, maxNum, emails, selectedColor, priority)
    console.log(response, 'i am middlware')
    return response
})


// drag card update
export const cardDragUpdate = createAsyncThunk('user/cardDragUpdate', async ({  droppableId, draggableId, access }) => {
    const response = await dragCardUpdate( droppableId, draggableId, access)
    console.log(response, 'middlatere0909090909090909')
    return response
})


// add comment
export const addComment = createAsyncThunk('user/addComment', async ({ access, user_id,user_name, comment, card_id }) => {
    const response = await newComment(access, user_id,user_name, comment, card_id)
    return response
})

// get all comments
export const getAllComment = createAsyncThunk('user/getAllComment', async ({ access, card_id }) => {
    const response = await getComments(access, card_id)
    return response
})


// editable card data update
export const cardEditableUpdate = createAsyncThunk('user/cardEditableUpdate', async ({ access, card_id, updatedData }) => {
    const response = await cardEditUpdate(access, card_id, updatedData)
    if (response.message === 'Card updated successfully') {
        updatedData.cardId = card_id
        return updatedData
    }
    else {
        return response
    }
})

// invite member
export const AssigneeInvite = createAsyncThunk('user/inviteMember', async ({ access, emails, card_id }) => {
    const response = await inviteAssignee(access, emails, card_id)
    return response
})


const cardSlice = createSlice({
    name: 'cardData',
    initialState: initialstate.cardData,
    reducers: {
        cardsUpdate: (state, action) => {
            return (
                { ...state, cards: action.payload }
            )
        },
        assigneeUpdate: (state, action) => {
            return (
                { ...state, assignee: action.payload }
            )
        },
        updateCardDeleteion: (state, action) => {
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCards.fulfilled, (state, action) => {
                return (
                    {
                        ...state, cards: action.payload.card?.length === 0 ? null : action.payload.card,
                        assignee: action.payload.card?.length === 0 ? null : action.payload.assignee,
                    }
                )
            })
            .addCase(newCardCreate.fulfilled, (state, action) => {
                // const lastAssignee = JSON.parse(action.payload.assignee);
                state.cards = state.cards === null ? [action.payload.card] : [...state.cards, action.payload.card];
                state.assignee = state.assignee === null ? [...action.payload.assignee] : [...state.assignee, ...action.payload.assignee];
            })
            .addCase(addComment.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        comments: [...state.comments, action.payload],
                    }
                )
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        comments: [...action.payload],
                    }
                )
            })
            .addCase(cardEditableUpdate.fulfilled, (state, action) => {
                const updatedCardId = action.payload.cardId;
                const updatedCardData = action.payload;
            
                return {
                    ...state,
                    cards: state.cards.map((card) =>
                        card.id === updatedCardId ? { ...card, ...updatedCardData } : card
                    ),
                };
            })
            .addCase(AssigneeInvite.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        assignee: [...state.assignee, ...action.payload],
                    }
                )
            })
            .addCase(cardDragUpdate.fulfilled, (state, action) => {
                const cardID = action.payload.id
                const updatedCardData = action.payload
                console.log(action.payload, 'rooooooo')
                return (
                    {
                        ...state,
                        cards: state.cards.map((card)=> card.id === cardID ? { ...card, ...updatedCardData } : card)
                    }
                )
            })     
    }
})

export const { cardsUpdate, assigneeUpdate, updateCardDeleteion } = cardSlice.actions;
export default cardSlice.reducer;