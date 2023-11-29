const BASE_URL = '/api/sendEvent';
import { ProductData } from 'types';

type EventTypeNames = 'route' | 'viewCard' | 'viewCardPromo' | 'addToCard' | 'purchase';

// Формат — джейсон вида:
// {
// 	type: типСобытия,
// 	payload: параметрыСобытия,
// 	timestamp: таймстамп
// }

type EventData = {
  type: EventTypeNames;
  payload: object;
};

class AnalyticsService {
  async dispatchRoute(type: 'route', payload: { url: string }) {
    await this._post({ type, payload });
  }

  async dispatchViewCard(type: 'viewCard' | 'viewCardPromo', payload: ProductData & { secretKey: string }) {
    await this._post({ type, payload });
  }

  async dispatchAddToCard(type: 'addToCard', payload: ProductData) {
    await this._post({ type, payload });
  }

  async dispatchPurchase(type: 'purchase', payload: { orderId: string; totalPrice: number; productIds: number[] }) {
    await this._post({ type, payload });
  }

  private async _post(data: EventData) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ...data, timestamp: Date.now() })
    });

    console.info(await res.json());
  }
}

export const analyticsService = new AnalyticsService();
