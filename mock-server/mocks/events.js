module.exports = {
  build: (app) => {
    app.get('/api/event', (req, res) => {
      res.send({
        "data": [
          {
            "id": 1,
            "division": "BR",
            "dateStart": "2027-06-30T23:01:02+00:00",
            "dateEnd": "2027-07-01T02:00:00+00:00",
            "eventName": "Teste",
            "status": "scheduled",
            "createdBy": 14,
            "description": "https:\/\/admin.kronos.stage.br.ivao.aero\/events",
            "banner": "https:\/\/cdn.discordapp.com\/attachments\/1090396815632892057\/1117175040589434910\/0pi8FTeVYuD9LNSmz.png",
            "atcBooking": "https:\/\/cdn.discordapp.com\/attachments\/1090396815632892057\/1117175040589434910\/0pi8FTeVYuD9LNSmz.png",
            "atcBriefing": "https:\/\/admin.kronos.stage.br.ivao.aero\/events",
            "pilotBriefing": "https:\/\/admin.kronos.stage.br.ivao.aero\/events",
            "public": 1,
            "created_at": "2023-06-10T23:59:03.000000Z",
            "updated_at": "2023-06-10T23:59:24.000000Z",
            "type": "rfe",
            "allowBookingAfterStart": 1,
            "has_started": false,
            "has_ended": false,
            "can_confirm_slots": false,
            "airports": [
              {
                "id": 25,
                "eventId": 12,
                "icao": "SBGR",
                "created_at": "2023-06-10T23:59:24.000000Z",
                "updated_at": "2023-06-10T23:59:24.000000Z",
                "sceneries": []
              }
            ]
          },
          {
            "id": 2,
            "division": "BR",
            "dateStart": "2027-05-21T19:51:53+00:00",
            "dateEnd": "2027-05-21T22:51:00+00:00",
            "eventName": "TEste",
            "status": "created",
            "createdBy": 22,
            "description": "https:\/\/discord.com\/ 212",
            "banner": "https:\/\/images.unsplash.com\/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=6000",
            "atcBooking": "https:\/\/images.unsplash.com\/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=6000",
            "atcBriefing": "https:\/\/discord.com\/",
            "pilotBriefing": "https:\/\/discord.com\/",
            "public": 1,
            "created_at": "2022-11-07T16:16:02.000000Z",
            "updated_at": "2025-10-16T22:46:30.000000Z",
            "type": "rfo",
            "allowBookingAfterStart": 1,
            "has_started": false,
            "has_ended": false,
            "can_confirm_slots": false,
            "airports": [
              {
                "id": 27,
                "eventId": 11,
                "icao": "SBGR",
                "created_at": "2025-10-16T22:46:30.000000Z",
                "updated_at": "2025-10-16T22:46:30.000000Z",
                "sceneries": []
              }
            ]
          },
          {
            "id": 3,
            "division": "BR",
            "dateStart": "2026-11-01T11:00:00+00:00",
            "dateEnd": "2026-11-01T23:00:00+00:00",
            "eventName": "Recife RFO",
            "status": "scheduled",
            "createdBy": 12,
            "description": "Welcome to the Recife Real Flight Operations.",
            "banner": "https:\/\/live.staticflickr.com\/65535\/52370625798_b691182db4_o.png",
            "atcBooking": "https:\/\/tools.ivao.aero\/event\/BR\/book\/2538",
            "atcBriefing": "https:\/\/google.com\/",
            "pilotBriefing": "https:\/\/drive.google.com\/file\/d\/1bYN44R-8aFdOwJIIh9bvMsrDfp0QCwhE\/view?usp=sharing",
            "public": 1,
            "created_at": "2022-09-29T21:30:28.000000Z",
            "updated_at": "2022-10-04T01:00:10.000000Z",
            "type": "rfo",
            "allowBookingAfterStart": 1,
            "has_started": false,
            "has_ended": false,
            "can_confirm_slots": false,
            "airports": [
              {
                "id": 20,
                "eventId": 10,
                "icao": "SBRF",
                "created_at": "2022-10-04T01:00:10.000000Z",
                "updated_at": "2022-10-04T01:00:10.000000Z",
                "sceneries": []
              }
            ]
          },
          {
            "id": 4,
            "division": "BR",
            "dateStart": "2026-06-04T23:20:00+00:00",
            "dateEnd": "2026-06-05T00:19:00+00:00",
            "eventName": "ABER",
            "status": "created",
            "createdBy": 14,
            "description": "as",
            "banner": "https:\/\/i.imgur.com\/BxOCgtz.jpeg",
            "atcBooking": "https:\/\/i.imgur.com\/BxOCgtz.jpeg",
            "atcBriefing": "https:\/\/kronos.br.ivao.aero\/events",
            "pilotBriefing": "https:\/\/kronos.br.ivao.aero\/events",
            "public": 1,
            "created_at": "2022-06-04T23:19:42.000000Z",
            "updated_at": "2022-06-04T23:19:42.000000Z",
            "type": "rfe",
            "allowBookingAfterStart": 1,
            "has_started": false,
            "has_ended": false,
            "can_confirm_slots": false,
            "airports": [
              {
                "id": 11,
                "eventId": 9,
                "icao": "SBGR",
                "created_at": "2022-06-04T23:19:42.000000Z",
                "updated_at": "2022-06-04T23:19:42.000000Z",
                "sceneries": []
              }
            ]
          },
          {
            "id": 5,
            "division": "BR",
            "dateStart": "2026-06-06T23:17:53+00:00",
            "dateEnd": "2026-06-07T02:00:00+00:00",
            "eventName": "WMA",
            "status": "created",
            "createdBy": 14,
            "description": "as",
            "banner": "https:\/\/i.imgur.com\/BxOCgtz.jpeg",
            "atcBooking": "https:\/\/kronos.br.ivao.aero\/events",
            "atcBriefing": "https:\/\/kronos.br.ivao.aero\/events",
            "pilotBriefing": "https:\/\/kronos.br.ivao.aero\/events",
            "public": 1,
            "created_at": "2022-06-04T23:18:49.000000Z",
            "updated_at": "2022-06-04T23:18:49.000000Z",
            "type": "rfe",
            "allowBookingAfterStart": 1,
            "has_started": false,
            "has_ended": false,
            "can_confirm_slots": false,
            "airports": [
              {
                "id": 10,
                "eventId": 8,
                "icao": "SBGR",
                "created_at": "2022-06-04T23:18:49.000000Z",
                "updated_at": "2022-06-04T23:18:49.000000Z",
                "sceneries": []
              }
            ]
          }
        ],
        "page": 1,
        "perPage": 5,
        "total": 10
      });
    });

    app.get('/api/event/2', (req, res) => {
      res.send({
        "id": 2,
        "division": "BR",
        "dateStart": "2026-04-13T19:00:40+00:00",
        "dateEnd": "2026-04-13T23:00:26+00:00",
        "eventName": "Brasília RFO 2025",
        "privateSlots": 0,
        "status": "scheduled",
        "createdBy": 19,
        "description": "Brasília Real Flight Operations 2025",
        "banner": "https://admin.br.ivao.aero/storage/images/MleniXywXbXw6nH9TcVnjghsWaWfbsIqRJBSMNZw.png",
        "atcBooking": "https://tools.ivao.aero/event/BR",
        "atcBriefing": "https://wiki.br.ivao.aero/pt-br/atcops/mops/sbbs/briefing-brasilia-rfo",
        "pilotBriefing": "https://forum.ivao.aero/forums/eventos.758/",
        "public": 0,
        "created_at": "2025-03-05T23:31:00.000000Z",
        "updated_at": "2025-04-13T13:31:21.000000Z",
        "type": "rfo",
        "allowBookingAfterStart": 0,
        "has_started": true,
        "has_ended": true,
        "can_confirm_slots": false,
        "airports": [
          {
            "id": 298,
            "eventId": 2,
            "icao": "SBBR",
            "created_at": "2025-04-13T13:31:21.000000Z",
            "updated_at": "2025-04-13T13:31:21.000000Z",
            "sceneries": [
              {
                "id": 19,
                "title": "AxScenery",
                "license": "freeware",
                "link": "https://axscenery.com/sbbr-5-0-brasilia/",
                "simulator": "xp11",
                "icao": "SBBR"
              },
              {
                "id": 20,
                "title": "Flightsim.to",
                "license": "freeware",
                "link": "https://flightsim.to/file/63131/braslia-international-airport-sbbr",
                "simulator": "msfs",
                "icao": "SBBR"
              }
            ]
          }
        ]
      });
    });
  }
}
