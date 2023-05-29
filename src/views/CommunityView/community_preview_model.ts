export interface ICommunityGet {
  id: string;
  title: string;
}
/*
public string? AdminId { get; set; }
		public ICollection<Moderator> ModeratorIds { get; set; }
		public string Title { get; set; }
		public string Slug { get; set; }
		public string Description { get; set; }
		public string? CoverImage { get; set; }
		public string? BannerImage { get; set; }
		// Herkes topluluğu görebilecek mi ?
		public bool IsVisible { get; set; } = true;
		// Kullanıcılar topluluğa katılabilmek için izin istemek zorunda mı ?
		public bool IsPublic { get; set; } = true;
		public bool IsRestricted { get; set; } = false;
		public int? ParticipiantLimit { get; set; } 
		public ICollection<string> Participiants { get; set; }

		public ICollection<string> JoinRequestWaitings { get; set; }

		public ICollection<Question> Questions { get; set; }

		public ICollection<string> Cities { get; set; }

		public ICollection<string> BlockedUsers { get; set; }

		//public ICollection<string> Posts { get; set; }

		public bool HasPrice { get; set; } = false;
		public int Price { get; set; } = 0; ama bi dk bak ben bunu tam düzeltmedim sanırım bakıcam 1 sn aynen dto dönmüyorum şuanda direkt entity dönüyo şuan acil mi bunu yapman ona göre düzeltiyim
        yok acil değil denemek istedim şeyi denesene
        search user ı şey için yapmıştımbu kullanıcı arama kısmına yazıyoruz ya ordan 4 5 tane kullanıcı alt alta geliyo felan o ekran için tasarlamıştım
*/
