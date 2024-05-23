import ChannelApiGateway from "../../../../../data/gateways/api/services/channel.gateway";
import ChannelRepository from "../../../../../data/gateways/api/services/channel.repository";
import GetUserChannelsUseCase from "../../../../../domain/usecases/channel/get-user-channels/get-user-channels.usecase";

export default class SidebarController {
  private readonly getUserChannelsUseCase: GetUserChannelsUseCase;

  constructor() {
    this.getUserChannelsUseCase = new GetUserChannelsUseCase(
      new ChannelApiGateway(),
      new ChannelRepository(),
    );
  }

  async getUserChannels(nextPage: string) {
    const page = this.getNextPage(nextPage)
    if (page) {
      return await this.getUserChannelsUseCase.execute(true, parseInt(page));
    }
  }

  getNextPage(nextPage: string) {
    try {
      if (nextPage) {
        const url = new URL(nextPage);
        const searchParams = new URLSearchParams(url.search);
        return searchParams.get('page');
      }
    } catch (error) {
      if (!(error instanceof TypeError)) {
        throw error;
      }
    }
  }
}