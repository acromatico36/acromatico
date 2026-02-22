// BRAND BUILDING PAGE - REBUILT FOR CONVERSION
// Apple-minimal design, brand-consistent, conversion-optimized

export const StudioPage = `
<div class="min-h-screen bg-white text-black">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: #fff;
      color: #000;
    }
    
    /* SPACING SCALE: 40 / 80 / 120 / 160 / 240 */
    
    /* HERO - ONE MESSAGE, ONE CTA */
    .hero-minimal {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
      text-align: center;
      position: relative;
    }
    
    .hero-minimal h1 {
      font-size: clamp(48px, 8vw, 96px);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1.1;
      margin-bottom: 40px;
      color: #000;
    }
    
    .hero-minimal .subtitle {
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 400;
      color: #666;
      max-width: 700px;
      margin: 0 auto 80px;
      line-height: 1.5;
    }
    
    .cta-primary {
      display: inline-block;
      background: #4794A6;
      color: #fff;
      padding: 20px 60px;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s;
    }
    
    .cta-primary:hover {
      background: #3a7a8a;
      transform: translateY(-2px);
    }
    
    .client-proof {
      margin-top: 120px;
      padding-top: 80px;
      border-top: 1px solid #e5e5e5;
    }
    
    .client-proof p {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin-bottom: 40px;
    }
    
    .client-logos-hero {
      display: flex;
      gap: 60px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .client-logos-hero img {
      height: 40px;
      width: auto;
      opacity: 0.4;
      filter: grayscale(100%);
      transition: all 0.2s;
    }
    
    .client-logos-hero img:hover {
      opacity: 0.8;
    }
    
    /* CASE STUDIES - FULL BLEED */
    .case-study {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    
    .case-study:nth-child(even) {
      direction: rtl;
    }
    
    .case-study:nth-child(even) > * {
      direction: ltr;
    }
    
    .case-image {
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    
    .case-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .case-content {
      padding: 120px 80px;
    }
    
    .case-logo {
      height: 50px;
      width: auto;
      margin-bottom: 40px;
      opacity: 0.8;
    }
    
    .case-content h2 {
      font-size: clamp(36px, 5vw, 56px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 24px;
    }
    
    .case-description {
      font-size: 18px;
      line-height: 1.7;
      color: #666;
      margin-bottom: 40px;
    }
    
    .case-results {
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
    }
    
    .result {
      flex: 1;
      min-width: 120px;
    }
    
    .result-number {
      font-size: 32px;
      font-weight: 700;
      color: #4794A6;
      display: block;
      margin-bottom: 8px;
    }
    
    .result-label {
      font-size: 14px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    /* OTHER CLIENTS */
    .other-clients {
      padding: 160px 80px;
      text-align: center;
      background: #fafafa;
    }
    
    .other-clients h3 {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin-bottom: 80px;
      font-weight: 500;
    }
    
    .client-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 60px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    
    .client-grid img {
      height: 50px;
      width: auto;
      margin: 0 auto;
      opacity: 0.3;
      filter: grayscale(100%);
      transition: all 0.2s;
    }
    
    .client-grid img:hover {
      opacity: 0.7;
    }
    
    /* FINAL CTA */
    .final-cta {
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 160px 40px;
      text-align: center;
      background: #000;
      color: #fff;
    }
    
    .final-cta .badge {
      display: inline-block;
      padding: 8px 20px;
      background: rgba(71, 148, 166, 0.1);
      border: 1px solid rgba(71, 148, 166, 0.3);
      border-radius: 20px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #4794A6;
      margin-bottom: 40px;
    }
    
    .final-cta h2 {
      font-size: clamp(40px, 7vw, 72px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 80px;
    }
    
    .cta-secondary {
      display: inline-block;
      background: #fff;
      color: #000;
      padding: 20px 60px;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s;
    }
    
    .cta-secondary:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }
    
    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .case-study {
        grid-template-columns: 1fr;
        min-height: auto;
      }
      
      .case-image {
        height: 60vh;
      }
      
      .case-content {
        padding: 80px 40px;
      }
      
      .client-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 40px;
      }
    }
  </style>

  <!-- HERO -->
  <section class="hero-minimal">
    <h1>We build brands<br/>that command attention.</h1>
    <p class="subtitle">
      Full-stack brand development for companies that refuse to blend in. 
      From visual identity to automated e-commerce, we build systems that scale.
    </p>
    <a href="/contact" class="cta-primary">Book Discovery Call</a>
    
    <div class="client-proof">
      <p>Trusted by</p>
      <div class="client-logos-hero">
        <img src="/static/images/clients/access-cgi.png" alt="Access by CGI" />
        <img src="/static/images/clients/lia.png" alt="LIA by Jomari Goyso" />
        <img src="/static/images/clients/ecolosophy.png" alt="Ecolosophy" />
        <img src="/static/images/clients/republic.png" alt="Republic" />
      </div>
    </div>
  </section>

  <!-- CASE: ACCESS BY CGI -->
  <section class="case-study">
    <div class="case-image">
      <img src="/static/images/brand-showcase/access-cgi-real.jpg" alt="Access by CGI" />
    </div>
    <div class="case-content">
      <img src="/static/images/clients/access-cgi.png" alt="Access by CGI" class="case-logo" />
      <h2>Global fintech brand for Fortune 500 clients</h2>
      <p class="case-description">
        Positioned Access by CGI as an enterprise-level financial technology leader. 
        Created authoritative brand identity system with Dubai skyline hero imagery, 
        custom photography, and comprehensive guidelines for C-suite credibility.
      </p>
      <div class="case-results">
        <div class="result">
          <span class="result-number">Enterprise</span>
          <span class="result-label">Positioning</span>
        </div>
        <div class="result">
          <span class="result-number">Fortune 500</span>
          <span class="result-label">Trust</span>
        </div>
        <div class="result">
          <span class="result-number">Complete</span>
          <span class="result-label">System</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CASE: LIA BY JOMARI GOYSO -->
  <section class="case-study">
    <div class="case-image">
      <img src="/static/images/brand-showcase/lia-beauty.jpg" alt="LIA by Jomari Goyso" />
    </div>
    <div class="case-content">
      <img src="/static/images/clients/lia.png" alt="LIA" class="case-logo" />
      <h2>Celebrity beauty brand, $0 to 7-figures</h2>
      <p class="case-description">
        Launched Emmy-winning stylist Jomari Goyso's luxury beauty line. 
        Built custom BigCommerce platform, automated fulfillment, and shot 400+ 
        product photos. Premium positioning justified by flawless execution.
      </p>
      <div class="case-results">
        <div class="result">
          <span class="result-number">7-Figures</span>
          <span class="result-label">Revenue</span>
        </div>
        <div class="result">
          <span class="result-number">400+</span>
          <span class="result-label">Photos</span>
        </div>
        <div class="result">
          <span class="result-number">100%</span>
          <span class="result-label">Automated</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CASE: ECOLOSOPHY -->
  <section class="case-study">
    <div class="case-image">
      <img src="/static/images/brand-showcase/ecolosophy-real.jpg" alt="Ecolosophy" />
    </div>
    <div class="case-content">
      <img src="/static/images/clients/ecolosophy.png" alt="Ecolosophy" class="case-logo" />
      <h2>Non-toxic cleaning, ocean-saving mission</h2>
      <p class="case-description">
        Built complete e-commerce ecosystem for wellness brand with environmental mission. 
        Shopify platform, warehouse automation, 500+ photos, and 12-month content system. 
        Beach aesthetic reflects the ocean they're protecting.
      </p>
      <div class="case-results">
        <div class="result">
          <span class="result-number">Shopify</span>
          <span class="result-label">Automation</span>
        </div>
        <div class="result">
          <span class="result-number">500+</span>
          <span class="result-label">Assets</span>
        </div>
        <div class="result">
          <span class="result-number">0→Launch</span>
          <span class="result-label">Full Stack</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CASE: REPUBLIC -->
  <section class="case-study">
    <div class="case-image">
      <img src="/static/images/brand-showcase/republic-real.jpg" alt="Republic Commercial Fund" />
    </div>
    <div class="case-content">
      <img src="/static/images/clients/republic.png" alt="Republic" class="case-logo" />
      <h2>Legacy-focused real estate fund</h2>
      <p class="case-description">
        Positioned commercial real estate fund for high-net-worth investors. 
        Bold eagle branding, skyscraper imagery, and authoritative visual system 
        that speaks confidence to serious money.
      </p>
      <div class="case-results">
        <div class="result">
          <span class="result-number">HNW</span>
          <span class="result-label">Investors</span>
        </div>
        <div class="result">
          <span class="result-number">Authority</span>
          <span class="result-label">Position</span>
        </div>
        <div class="result">
          <span class="result-number">Complete</span>
          <span class="result-label">System</span>
        </div>
      </div>
    </div>
  </section>

  <!-- OTHER CLIENTS -->
  <section class="other-clients">
    <h3>Also trusted by</h3>
    <div class="client-grid">
      <img src="/static/images/clients/midpay.png" alt="MidPay" />
      <img src="/static/images/clients/midbank.png" alt="MidBank" />
      <img src="/static/images/clients/one-investment.png" alt="One Investment" />
      <img src="/static/images/clients/travel-drd.png" alt="Travel DRD" />
      <img src="/static/images/clients/circulo.png" alt="Círculo" />
      <img src="/static/images/clients/medworks.png" alt="MedWorks" />
      <img src="/static/images/clients/hollywood-restoration.png" alt="Hollywood Restoration" />
      <img src="/static/images/clients/abc-cleaning.png" alt="ABC Cleaning" />
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta">
    <div class="badge">Limited to 6 clients per year</div>
    <h2>Ready to build<br/>something exceptional?</h2>
    <a href="/contact" class="cta-secondary">Start Your Project</a>
  </section>
</div>
`;
