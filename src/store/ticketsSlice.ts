import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTickets, updateTicketStatus } from "../api/ticketsApi";

export type TicketStatus = "open" | "in_progress" | "resolved";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: TicketStatus;
  assignee: string;
}

interface TicketsState {
  items: Ticket[];
  loading: boolean;
  error: string | null;
  selectedStatus: TicketStatus | "all";
}

const initialState: TicketsState = {
  items: [],
  loading: false,
  error: null,
  selectedStatus: "all",
};
// Se mejora el manejo de errores usando rejectWithValue
// para poder enviar mensajes personalizados desde el servicio (API)
// en lugar de usar errores genéricos en el reducer.
export const loadTickets = createAsyncThunk(
  "tickets/load",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTickets();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeTicketStatus = createAsyncThunk(
  "tickets/changeStatus",
  async ({ id, status }: { id: number; status: TicketStatus }) => {
    return await updateTicketStatus(id, status);
  },
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSelectedStatus(state, action: PayloadAction<TicketStatus | "all">) {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Se utiliza el payload del thunk para mostrar el error real proveniente del servicio.
      // Si no existe, se usa un mensaje genérico como fallback.
      .addCase(loadTickets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "No fue posible cargar los tickets";
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setSelectedStatus } = ticketsSlice.actions;
export default ticketsSlice.reducer;
