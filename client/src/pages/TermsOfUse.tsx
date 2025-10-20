import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

export default function TermsOfUse() {
  return (
    <>
      <SEO 
        title="Terms of Use - AgentiLab.ai"
        description="Terms and conditions for using AgentiLab.ai services and platform."
      />
      <div className="min-h-screen bg-background py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-terms">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: October 9, 2025</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using AgentiLab.ai's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software) on AgentiLab.ai's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on AgentiLab.ai's platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. AI Development Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                AgentiLab.ai provides AI development and consulting services. All custom development work is subject to separate project agreements and service contracts. Intellectual property rights will be defined in individual project contracts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on AgentiLab.ai's platform are provided on an 'as is' basis. AgentiLab.ai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall AgentiLab.ai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AgentiLab.ai's platform, even if AgentiLab.ai or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on AgentiLab.ai's platform could include technical, typographical, or photographic errors. AgentiLab.ai does not warrant that any of the materials on its platform are accurate, complete, or current. AgentiLab.ai may make changes to the materials contained on its platform at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                AgentiLab.ai has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AgentiLab.ai of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                AgentiLab.ai may revise these terms of use for its platform at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Quebec, Canada and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>Email: contact@agentilab.ai</p>
                <p>Phone: +1 (367) 380-4910</p>
                <p>Address: 1820 rue des intendants, local 218, Québec, Canada, G1J 5C2</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
