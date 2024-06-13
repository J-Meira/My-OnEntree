namespace API.Data
{
  public class AppDbContext(DbContextOptions options) : IdentityDbContext<User, Role, int>(options)
  {
    public DbSet<State> States { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<Place> Places { get; set; }
    public DbSet<PlaceType> PlaceTypes { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventType> EventTypes { get; set; }
    public DbSet<EventSchedule> EventSchedules { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<Place>()
      .HasOne(a => a.Contact)
      .WithOne()
      .HasForeignKey<PlaceContact>(a => a.Id)
      .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Event>()
      .HasOne(a => a.Contact)
      .WithOne()
      .HasForeignKey<EventContact>(a => a.Id)
      .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Role>()
        .HasData(
          new Role { Id = 1, Name = "Admin", NormalizedName = "ADMIN" }
        );

      builder.Entity<City>()
        .Property(e => e.Id)
        .ValueGeneratedNever();

      builder.Entity<State>()
        .Property(e => e.Id)
        .ValueGeneratedNever();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
      configurationBuilder
        .Properties<string>()
        .HaveMaxLength(150);


    }

  }
}
