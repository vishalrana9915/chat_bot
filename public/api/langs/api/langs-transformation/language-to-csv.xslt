<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2010 rel. 3 sp1 (x64) (http://www.altova.com) by Shawn S Miller (private) -->
<!-- Description: Used to transform XML Langs (language.xml) into CSV for export to CSV -->
<xsl:stylesheet id="xslLangTransformToCsv" version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output omit-xml-declaration="yes" indent="yes" method="text" encoding="UTF-8"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="/*">
    
		<!--Write values to top of document-->
        <xsl:text>sep=| &#xA;</xsl:text>
        <xsl:text>key | us | fr | en-ca | es | de &#xA;</xsl:text>
        
		<!--Call Template-->
        <xsl:apply-templates select="key"/>
        
    </xsl:template>

    <xsl:template match="key">
        <xsl:variable name="vPos" select="position()"/>
        
        <xsl:if test="$vPos &gt; 1">
			<!--HTML Encoded Line Feed character-->
            <xsl:text>&#xA;</xsl:text>
        </xsl:if>
        
        <xsl:value-of select="@value"/>
        
        <!--Call Template-->
        <xsl:apply-templates select="language"/>
    </xsl:template>

    <xsl:template match="language/text()">
        <xsl:for-each select=".">
            <xsl:text> | </xsl:text>
            <xsl:value-of select="."/>
        </xsl:for-each>
    </xsl:template>
    
</xsl:stylesheet>