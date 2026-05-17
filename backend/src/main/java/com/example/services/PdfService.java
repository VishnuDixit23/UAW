package com.example.services;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;
import java.io.ByteArrayOutputStream;
import java.util.Map;

@Service
public class PdfService {

    // Spring Boot automatically Thymeleaf's TemplateEngine ko inject kar dega
    private final TemplateEngine templateEngine;

    public PdfService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public byte[] generate80GReceipt(Map<String, Object> data) throws Exception {
        Context context = new Context();
        context.setVariables(data);
        
        String htmlContent = templateEngine.process("receipt", context);
        
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();

            // 1. PDF Writer ko manually access karke compression settings lagana
            // Isse metadata aur text content compress ho jata hai
            renderer.createPDF(os, false); // False matlab finalize abhi nahi karna
            
            // iText ke internal writer ko retrieve karein
            com.lowagie.text.pdf.PdfWriter writer = renderer.getWriter();
            
            // 2. BEST_COMPRESSION level 9 hota hai
            writer.setFullCompression(); 
            writer.setCompressionLevel(com.lowagie.text.pdf.PdfStream.BEST_COMPRESSION);

            // 3. Finalize the PDF
            renderer.finishPDF();
            
            return os.toByteArray();
        }
    }
}
