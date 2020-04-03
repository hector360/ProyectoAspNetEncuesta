using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EncuestaV2.Startup))]
namespace EncuestaV2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
